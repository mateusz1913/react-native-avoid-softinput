require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "ReactNativeAvoidSoftinput"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.4" }
  s.source       = { :git => "https://github.com/mateusz1913/react-native-avoid-softinput.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,cpp}"

  s.pod_target_xcconfig    = {
      "DEFINES_MODULE" => "YES",
      "SWIFT_OBJC_INTERFACE_HEADER_NAME" => "ReactNativeAvoidSoftinput-Swift.h",
  }

  install_modules_dependencies(s)
end
