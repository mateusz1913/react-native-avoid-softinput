const avoidSoftInputMock = {
  AvoidSoftInput: {
    onSoftInputAppliedOffsetChange: jest.fn(),   
    onSoftInputHeightChange: jest.fn(),
    onSoftInputHidden: jest.fn(),
    onSoftInputShown: jest.fn(),
    setAdjustNothing: jest.fn(),
    setAdjustPan: jest.fn(),
    setAdjustResize: jest.fn(),
    setAdjustUnspecified: jest.fn(),
    setAvoidOffset: jest.fn(),
    setDefaultAppSoftInputMode: jest.fn(),
    setEasing: jest.fn(),
    setEnabled: jest.fn(),
    setHideAnimationDelay: jest.fn(),
    setHideAnimationDuration: jest.fn(),
    setShouldMimicIOSBehavior: jest.fn(),
    setShowAnimationDelay: jest.fn(),
    setShowAnimationDuration: jest.fn(),
  },
  AvoidSoftInputView: jest.requireActual(
    'react-native/Libraries/Components/View/View'
  ),
  useSoftInputAppliedOffsetChanged: jest.fn(),
  useSoftInputHeightChanged: jest.fn(),
  useSoftInputHidden: jest.fn(),
  useSoftInputShown: jest.fn(),
  useSoftInputState: jest.fn(),
};

module.exports = avoidSoftInputMock;
