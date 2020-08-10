import React, { ReactNode } from 'react';
import styles from './Card.module.css';

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return <li className={styles['card']}>{children}</li>;
}
