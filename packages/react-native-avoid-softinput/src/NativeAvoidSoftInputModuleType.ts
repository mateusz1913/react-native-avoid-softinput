import type { NativeModule } from 'react-native';

import type { SoftInputEasing } from './types';

export interface Module extends NativeModule {
  setAdjustNothing(): void;
  setAdjustPan(): void;
  setAdjustResize(): void;
  setAdjustUnspecified(): void;
  setAvoidOffset(offset: number): void;
  setDefaultAppSoftInputMode(): void;
  setEasing(easing: SoftInputEasing): void;
  setEnabled(enabled: boolean): void;
  setHideAnimationDelay(delay?: number): void;
  setHideAnimationDuration(duration?: number): void;
  setShowAnimationDelay(delay?: number): void;
  setShowAnimationDuration(duration?: number): void;
}
