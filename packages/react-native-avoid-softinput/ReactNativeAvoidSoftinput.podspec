require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

new_arch_enabled = ENV['RCT_NEW_ARCH_ENABLED'] == '1'

Pod::Spec.new do |s|
  s.name         = "ReactNativeAvoidSoftinput"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11.0", :tvos => "11.0" }
  s.source       = { :git => "https://github.com/mateusz1913/react-native-avoid-softinput.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,cpp,swift}"

  if new_arch_enabled
    s.pod_target_xcconfig    = {
        "DEFINES_MODULE" => "YES",
        "SWIFT_OBJC_INTERFACE_HEADER_NAME" => "ReactNativeAvoidSoftinput-Swift.h",
        # This is handy when we want to detect if new arch is enabled in Swift code
        # and can be used like:
        # #if AVOID_SOFTINPUT_NEW_ARCH_ENABLED
        # // do sth when new arch is enabled
        # #else
        # // do sth when old arch is enabled
        # #endif
        "OTHER_SWIFT_FLAGS" => "-DAVOID_SOFTINPUT_NEW_ARCH_ENABLED"
    }
  else
    s.pod_target_xcconfig = {
      "DEFINES_MODULE" => "YES",
      "SWIFT_OBJC_INTERFACE_HEADER_NAME" => "ReactNativeAvoidSoftinput-Swift.h"
    }
  end

  install_modules_dependencies(s)
end
