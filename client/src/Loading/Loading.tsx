import React from 'react';
import logo from '../logo.svg';
import styles from './Loading.module.css';

export default function Loading() {
  return <img src={logo} className={styles['react-logo']} alt="loading" />;
}
