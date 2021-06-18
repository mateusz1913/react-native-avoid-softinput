import { NativeModules } from 'react-native';

type AvoidSoftinputType = {
  multiply(a: number, b: number): Promise<number>;
};

const { AvoidSoftinput } = NativeModules;

export default AvoidSoftinput as AvoidSoftinputType;
