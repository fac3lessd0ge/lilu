import * as React from 'react';
import { PickupVariant } from './PickupVariant';
import { PostVariant } from './PostVariant';

interface IdeliveryForms {
  variant: 'post' | 'pickup'
}


export const DeliveryForms: React.FC<IdeliveryForms> = ({ variant }) => {
  
  
  if (variant === 'pickup') return <PickupVariant />

  return (
    <PostVariant />
  )
}