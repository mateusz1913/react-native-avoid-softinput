import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import React from 'react';

import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Handles keyboard fully on native side',
    image: '/img/KeyboardAnimationSVG1.svg',
    description: 
      <>
        Library applies padding or translation on native side and 
        detects if currently focused input needs to be pushed above displayed keyboard.
      </>
    ,
  },
  {
    title: 'Easy to Use',
    image: '/img/KeyboardAnimationSVG2.svg',
    description: 
      <>
        Enable AvoidSoftInput module or wrap your content in AvoidSoftInputView 
        and have your text fields always displayed above the keyboard out-of-the-box.
      </>
    ,
  },
  {
    title: 'Consistent behavior',
    image: '/img/KeyboardAnimationSVG3.svg',
    description: 
      <>
        Library works in same fashion on Android and iOS.
      </>
    ,
  },
];

const Feature: React.FC<FeatureItem> = ({ title, image, description }) => {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.keyboardAnimationWrapper}>
          <div className={styles.keyboardAnimationContainer}>
            <img
              className={styles.featureSvg}
              alt={title}
              src={useBaseUrl(image)}
            />
          </div>
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const HomepageFeatures: React.FC = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => 
            <Feature key={idx} {...props} />
          )}
        </div>
      </div>
    </section>
  );
};
