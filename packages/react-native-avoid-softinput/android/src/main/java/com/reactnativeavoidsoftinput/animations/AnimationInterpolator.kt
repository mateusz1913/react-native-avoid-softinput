package com.reactnativeavoidsoftinput.animations

import android.animation.TimeInterpolator
import android.view.animation.LinearInterpolator
import android.view.animation.PathInterpolator

class AnimationInterpolator : TimeInterpolator {
  private val linearInterpolator = LinearInterpolator()
  private val pathInterpolator = PathInterpolator(0.42F, 0F, 1F, 1F)
  private var mMode = MODE.LINEAR

  var mode: MODE
    get() = mMode
    set(newValue) {
      mMode = newValue
    }

  override fun getInterpolation(input: Float): Float {
    return when (mMode) {
      MODE.EASE_IN -> {
        pathInterpolator.getInterpolation(input)
      }
      MODE.EASE_IN_OUT -> {
        if (input < 0.5) {
          pathInterpolator.getInterpolation(input * 2) / 2
        } else {
          1 - pathInterpolator.getInterpolation((1 - input) * 2) / 2
        }
      }
      MODE.EASE_OUT -> {
        1 - pathInterpolator.getInterpolation(1 - input)
      }
      else -> {
        linearInterpolator.getInterpolation(input)
      }
    }
  }

  companion object {
    enum class MODE {
      EASE_IN,
      EASE_IN_OUT,
      EASE_OUT,
      LINEAR
    }
  }
}
