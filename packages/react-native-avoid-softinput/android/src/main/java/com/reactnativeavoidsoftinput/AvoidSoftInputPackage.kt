package com.reactnativeavoidsoftinput

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.facebook.react.uimanager.ViewManager

class AvoidSoftInputPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return when (name) {
            AvoidSoftInputModuleImpl.NAME -> AvoidSoftInputModule(reactContext)
            else -> null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        val moduleList: Array<Class<out NativeModule?>> = arrayOf(AvoidSoftInputModule::class.java)
        val reactModuleInfoMap: MutableMap<String, ReactModuleInfo> = HashMap()
        for (moduleClass in moduleList) {
            val reactModule = moduleClass.getAnnotation(ReactModule::class.java) ?: continue
            reactModuleInfoMap[reactModule.name] =
                ReactModuleInfo(
                    reactModule.name,
                    moduleClass.name,
                    true,
                    reactModule.needsEagerInit,
                    reactModule.isCxxModule,
                    TurboModule::class.java.isAssignableFrom(moduleClass)
                )
        }
        return ReactModuleInfoProvider { reactModuleInfoMap }
    }

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> {
        return listOf(AvoidSoftInputViewManager())
    }
}
