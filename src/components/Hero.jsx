import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import profileImage from '../assets/profile.png';
import * as faceapi from '@vladmandic/face-api';

const faceModelUrl = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';

export const Hero = () => {
  const [profileObjectPosition, setProfileObjectPosition] = useState('50% 18%');

  const handleProfileImageLoad = async (event) => {
    const image = event.currentTarget;

    try {
      await faceapi.nets.ssdMobilenetv1.loadFromUri(faceModelUrl);
      const detection = await faceapi.detectSingleFace(image, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.3 }));
      if (!detection) return;

      const faceCenterY = detection.box.top + (detection.box.height / 2);
      const renderedHeight = image.naturalHeight * (image.clientWidth / image.naturalWidth);
      const overflowHeight = Math.max(1, renderedHeight - image.clientHeight);
      const desiredOffset = (faceCenterY * (image.clientWidth / image.naturalWidth)) - (image.clientHeight / 2);
      const positionY = Math.max(0, Math.min(100, (desiredOffset / overflowHeight) * 100));
      setProfileObjectPosition(`50% ${positionY}%`);
    } catch {
      setProfileObjectPosition('50% 18%');
    }
  };

  return (
    <section id="home" className="reference-hero relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="hero-geometry hero-geometry-one" />
      <div className="hero-geometry hero-geometry-two" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-8 lg:px-8">
        <div className="relative z-10 lg:col-span-7">
          <p className="mb-5 text-base font-medium tracking-[0.16em] text-[#858585] uppercase sm:text-lg">Hi, I am</p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-7xl lg:text-[5.4rem]">{personalInfo.name}</h1>
          <p className="mt-5 text-2xl font-bold tracking-[-0.02em] text-[#ff6a00] sm:text-4xl">Software Developer</p>
          <div className="mt-7 flex items-center gap-3">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hero-social" aria-label="GitHub"><GithubIcon className="h-4 w-4" /></a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social" aria-label="LinkedIn"><LinkedinIcon className="h-4 w-4" /></a>
            <a href={`mailto:${personalInfo.email}`} className="hero-social" aria-label="Email"><Mail className="h-4 w-4" /></a>
          </div>
          <div className="reference-stats mt-12 grid max-w-xl grid-cols-[repeat(3,minmax(0,1fr))] divide-x divide-[#3a3a3a]">
            <div className="stat-item px-2 sm:px-5"><strong><GraduationCap className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />{personalInfo.educationPeriod}</strong><span>B.E. Computer Science</span></div>
            <div className="stat-item px-2 sm:px-5"><strong>2+</strong><span>Projects Built</span></div>
            <div className="stat-item px-2 sm:px-5"><strong>4+</strong><span>Certifications Earned</span></div>
          </div>
        </div>
        <div className="relative flex min-h-[330px] items-end justify-center lg:col-span-5 lg:min-h-[470px] lg:items-start lg:pt-12">
          <div className="profile-backdrop" />
          <div className="profile-ring" />
          <img src={profileImage} alt={personalInfo.name} onLoad={handleProfileImageLoad} loading="eager" decoding="async" fetchPriority="high" draggable="false" style={{ objectPosition: profileObjectPosition }} className="relative z-10 aspect-square h-[270px] w-[270px] rounded-full object-cover grayscale-[0.12] sm:h-[330px] sm:w-[330px] lg:h-[390px] lg:w-[390px]" />
        </div>
      </div>
    </section>
  );
};