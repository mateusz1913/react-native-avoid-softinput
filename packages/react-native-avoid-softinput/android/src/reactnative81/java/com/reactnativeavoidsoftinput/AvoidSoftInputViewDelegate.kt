package com.reactnativeavoidsoftinput

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.BaseViewManagerDelegate
import com.facebook.react.views.view.ReactViewGroup

class AvoidSoftInputViewManagerDelegate(viewManager: AvoidSoftInputViewManager) :
    BaseViewManagerDelegate<ReactViewGroup, AvoidSoftInputViewManager>(viewManager) {
    override fun setProperty(view: ReactViewGroup, propName: String, value: Any?) {
        when (propName) {
            "avoidOffset" ->
                mViewManager.setAvoidOffset(
                    view as AvoidSoftInputView,
                    (value as Double?)?.toFloat() ?: 0f
                )
            "easing" -> mViewManager.setEasing(view as AvoidSoftInputView, value as String?)
            "enabled" ->
                mViewManager.setEnabled(view as AvoidSoftInputView, value as Boolean? ?: true)
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

    override fun receiveCommand(view: ReactViewGroup, commandName: String, args: ReadableArray) {
        super.receiveCommand(view, commandName, args)
    }
}
