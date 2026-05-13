#!/usr/bin/env bash

function lint {
  if ! command -v clang-format &> /dev/null
  then
    echo "ClangFormat is not installed. Skipping"
    return
  fi

  find packages/react-native-avoid-softinput/ios -type f \
          -name "*.c" -o \
          -name "*.cpp" -o \
          -name "*.h" -o \
          -name "*.m" -o \
          -name "*.mm" | xargs clang-format --dry-run -i -Werror
}

function format {
  if ! command -v clang-format &> /dev/null
  then
    echo "ClangFormat is not installed. Skipping"
    return
  fi

  find packages/react-native-avoid-softinput/ios -type f \
          -name "*.c" -o \
          -name "*.cpp" -o \
          -name "*.h" -o \
          -name "*.m" -o \
          -name "*.mm" | xargs clang-format -i -Werror
}

"$@"
