import { NativeEventEmitter, NativeModules } from 'react-native';

import type { Module } from './NativeAvoidSoftInputModuleType';

export const module: Module = NativeModules.AvoidSoftInput;

export const eventEmitter = new NativeEventEmitter(module);
