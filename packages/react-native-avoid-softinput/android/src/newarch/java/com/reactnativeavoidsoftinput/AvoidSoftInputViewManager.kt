package com.reactnativeavoidsoftinput

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.BaseViewManagerDelegate
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.AvoidSoftInputViewManagerInterface
import com.facebook.react.views.view.ReactViewGroup
import com.facebook.react.views.view.ReactViewManager
import com.reactnativeavoidsoftinput.events.AvoidSoftInputAppliedOffsetChangedEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputHeightChangedEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputHiddenEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputShownEvent

@ReactModule(name = AvoidSoftInputView.NAME)
class AvoidSoftInputViewManager :
    ReactViewManager(), AvoidSoftInputViewManagerInterface<AvoidSoftInputView> {
    private val delegate =
        object : BaseViewManagerDelegate<ReactViewGroup, AvoidSoftInputViewManager>(this) {
            override fun setProperty(view: ReactViewGroup, propName: String, value: Any?) {
                when (propName) {
                    "avoidOffset" ->
                        mViewManager.setAvoidOffset(
                            view as AvoidSoftInputView,
                            (value as Double?)?.toFloat() ?: 0f
                        )
                    "easing" -> mViewManager.setEasing(view as AvoidSoftInputView, value as String?)
                    "enabled" ->
                        mViewManager.setEnabled(
                            view as AvoidSoftInputView,
                            value as Boolean? ?: true
                        )
                    "hideAnimationDelay" ->
                        mViewManager.setHideAnimationDelay(
                            view as AvoidSoftInputView,
                            (value as Double?)?.toInt() ?: 300
                        )
                    "hideAnimationDuration" ->
                        mViewManager.setHideAnimationDuration(
                            view as AvoidSoftInputView,
                            (value as Double?)?.toInt() ?: 220
                        )
                    "showAnimationDelay" ->
                        mViewManager.setShowAnimationDelay(
                            view as AvoidSoftInputView,
                            (value as Double?)?.toInt() ?: 0
                        )
                    "showAnimationDuration" ->
                        mViewManager.setShowAnimationDuration(
                            view as AvoidSoftInputView,
                            (value as Double?)?.toInt() ?: 660
                        )
                    else -> super.setProperty(view, propName, value)
                }
            }

            override fun receiveCommand(
                view: ReactViewGroup,
                commandName: String,
                args: ReadableArray?
            ) {
                super.receiveCommand(view, commandName, args)
            }
        }

    override fun getName() = AvoidSoftInputView.NAME

    override fun getDelegate() = delegate

    override fun createViewInstance(reactContext: ThemedReactContext): AvoidSoftInputView {
        return AvoidSoftInputView(reactContext)
    }

    override fun prepareToRecycleView(
        reactContext: ThemedReactContext,
        view: ReactViewGroup
    ): ReactViewGroup {
        (view as AvoidSoftInputView).cleanup()

        super.prepareToRecycleView(reactContext, view)

        return view
    }

    @ReactProp(name = "avoidOffset")
    override fun setAvoidOffset(view: AvoidSoftInputView, avoidOffset: Float) {
        view.setAvoidOffset(avoidOffset)
    }

    @ReactProp(name = "easing")
    override fun setEasing(view: AvoidSoftInputView, easing: String?) {
        view.setEasing(easing)
    }

    @ReactProp(name = "enabled", defaultBoolean = true)
    override fun setEnabled(view: AvoidSoftInputView, enabled: Boolean) {
        view.setIsEnabled(enabled)
    }

    @ReactProp(name = "hideAnimationDelay")
    override fun setHideAnimationDelay(view: AvoidSoftInputView, delay: Int) {
        view.setHideAnimationDelay(delay)
    }

    @ReactProp(name = "hideAnimationDuration")
    override fun setHideAnimationDuration(view: AvoidSoftInputView, duration: Int) {
        view.setHideAnimationDuration(duration)
    }

    @ReactProp(name = "showAnimationDelay")
    override fun setShowAnimationDelay(view: AvoidSoftInputView, delay: Int) {
        view.setShowAnimationDelay(delay)
    }

    @ReactProp(name = "showAnimationDuration")
    override fun setShowAnimationDuration(view: AvoidSoftInputView, duration: Int) {
        view.setShowAnimationDuration(duration)
    }

    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
        return hashMapOf(
            AvoidSoftInputAppliedOffsetChangedEvent.NAME to
                hashMapOf(
                    "registrationName" to AvoidSoftInputView.ON_SOFT_INPUT_APPLIED_OFFSET_CHANGE
                ),
            AvoidSoftInputHeightChangedEvent.NAME to
                hashMapOf("registrationName" to AvoidSoftInputView.ON_SOFT_INPUT_HEIGHT_CHANGE),
            AvoidSoftInputHiddenEvent.NAME to
                hashMapOf("registrationName" to AvoidSoftInputView.ON_SOFT_INPUT_HIDDEN),
            AvoidSoftInputShownEvent.NAME to
                hashMapOf("registrationName" to AvoidSoftInputView.ON_SOFT_INPUT_SHOWN)
        )
    }
}
