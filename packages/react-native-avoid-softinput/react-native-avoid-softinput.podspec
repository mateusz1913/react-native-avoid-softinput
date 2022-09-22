require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

# TODO
# Migrate to install_module_dependencies https://github.com/facebook/react-native/commit/82e9c6ad611f1fb816de056ff031716f8cb24b4e#diff-adcf572f001c2b710d14f409c14763f1a50b08369b3034548f1602685d21f67f
# when library will drop support for RN < 0.71

fabric_enabled = ENV['RCT_NEW_ARCH_ENABLED'] == '1'

folly_version = '2021.07.22.00'
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "react-native-avoid-softinput"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11.0", :tvos => "11.0" }
  s.source       = { :git => "https://github.com/mateusz1913/react-native-avoid-softinput.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,cpp,swift}"
  s.dependency "React-Core"

  if fabric_enabled
    s.compiler_flags         = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
    s.pod_target_xcconfig    = {
        "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
        "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
        "CLANG_CXX_LANGUAGE_STANDARD" => "c++17",
        "DEFINES_MODULE" => "YES",
        # This is handy when we want to detect if new arch is enabled in Swift code
        # and can be used like:
        # #if AVOID_SOFTINPUT_NEW_ARCH_ENABLED
        # // do sth when new arch is enabled
        # #else
        # // do sth when old arch is enabled
        # #endif
        "OTHER_SWIFT_FLAGS" => "-DAVOID_SOFTINPUT_NEW_ARCH_ENABLED"
    }

    s.dependency "React-RCTFabric"
    s.dependency "React-Codegen"
    s.dependency "RCT-Folly", folly_version
    s.dependency "RCTRequired"
    s.dependency "RCTTypeSafety"
    s.dependency "ReactCommon/turbomodule/core"
  else
    s.pod_target_xcconfig = { "DEFINES_MODULE" => "YES" }
  end
end
