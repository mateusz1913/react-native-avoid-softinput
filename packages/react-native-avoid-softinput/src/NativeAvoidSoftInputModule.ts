import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setAdjustNothing: () => void;
  setAdjustPan: () => void;
  setAdjustResize: () => void;
  setAdjustUnspecified: () => void;
  setAvoidOffset: (offset: number) => void;
  setDefaultAppSoftInputMode: () => void;
  setEasing: (easing: string) => void;
  setEnabled: (enabled: boolean) => void;
  setHideAnimationDelay: (delay?: number) => void;
  setHideAnimationDuration: (duration?: number) => void;
  setShouldMimicIOSBehavior: (shouldMimic: boolean) => void;
  setShowAnimationDelay: (delay?: number) => void;
  setShowAnimationDuration: (duration?: number) => void;

  // Events
  addListener: (eventName: string) => void;
  removeListeners: (count: number) => void;
}

export default TurboModuleRegistry.get<Spec>('AvoidSoftInput');
