///
/// ContactFields.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#if __has_include(<NitroModules/NitroHash.hpp>)
#include <NitroModules/NitroHash.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif
#if __has_include(<NitroModules/JSIConverter.hpp>)
#include <NitroModules/JSIConverter.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif
#if __has_include(<NitroModules/NitroDefines.hpp>)
#include <NitroModules/NitroDefines.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif

namespace margelo::nitro::contacts {

  /**
   * An enum which can be represented as a JavaScript union (ContactFields).
   */
  enum class ContactFields {
    FIRST_NAME      SWIFT_NAME(firstName) = 0,
    LAST_NAME      SWIFT_NAME(lastName) = 1,
    MIDDLE_NAME      SWIFT_NAME(middleName) = 2,
    PHONE_NUMBERS      SWIFT_NAME(phoneNumbers) = 3,
    EMAIL_ADDRESSES      SWIFT_NAME(emailAddresses) = 4,
    IMAGE_DATA      SWIFT_NAME(imageData) = 5,
    THUMBNAIL_IMAGE_DATA      SWIFT_NAME(thumbnailImageData) = 6,
    GIVEN_NAME_KEY      SWIFT_NAME(givenNameKey) = 7,
  } CLOSED_ENUM;

} // namespace margelo::nitro::contacts

namespace margelo::nitro {

  using namespace margelo::nitro::contacts;

  // C++ ContactFields <> JS ContactFields (union)
  template <>
  struct JSIConverter<ContactFields> {
    static inline ContactFields fromJSI(jsi::Runtime& runtime, const jsi::Value& arg) {
      std::string unionValue = JSIConverter<std::string>::fromJSI(runtime, arg);
      switch (hashString(unionValue.c_str(), unionValue.size())) {
        case hashString("FIRST_NAME"): return ContactFields::FIRST_NAME;
        case hashString("LAST_NAME"): return ContactFields::LAST_NAME;
        case hashString("MIDDLE_NAME"): return ContactFields::MIDDLE_NAME;
        case hashString("PHONE_NUMBERS"): return ContactFields::PHONE_NUMBERS;
        case hashString("EMAIL_ADDRESSES"): return ContactFields::EMAIL_ADDRESSES;
        case hashString("IMAGE_DATA"): return ContactFields::IMAGE_DATA;
        case hashString("THUMBNAIL_IMAGE_DATA"): return ContactFields::THUMBNAIL_IMAGE_DATA;
        case hashString("GIVEN_NAME_KEY"): return ContactFields::GIVEN_NAME_KEY;
        default: [[unlikely]]
          throw std::invalid_argument("Cannot convert \"" + unionValue + "\" to enum ContactFields - invalid value!");
      }
    }
    static inline jsi::Value toJSI(jsi::Runtime& runtime, ContactFields arg) {
      switch (arg) {
        case ContactFields::FIRST_NAME: return JSIConverter<std::string>::toJSI(runtime, "FIRST_NAME");
        case ContactFields::LAST_NAME: return JSIConverter<std::string>::toJSI(runtime, "LAST_NAME");
        case ContactFields::MIDDLE_NAME: return JSIConverter<std::string>::toJSI(runtime, "MIDDLE_NAME");
        case ContactFields::PHONE_NUMBERS: return JSIConverter<std::string>::toJSI(runtime, "PHONE_NUMBERS");
        case ContactFields::EMAIL_ADDRESSES: return JSIConverter<std::string>::toJSI(runtime, "EMAIL_ADDRESSES");
        case ContactFields::IMAGE_DATA: return JSIConverter<std::string>::toJSI(runtime, "IMAGE_DATA");
        case ContactFields::THUMBNAIL_IMAGE_DATA: return JSIConverter<std::string>::toJSI(runtime, "THUMBNAIL_IMAGE_DATA");
        case ContactFields::GIVEN_NAME_KEY: return JSIConverter<std::string>::toJSI(runtime, "GIVEN_NAME_KEY");
        default: [[unlikely]]
          throw std::invalid_argument("Cannot convert ContactFields to JS - invalid value: "
                                    + std::to_string(static_cast<int>(arg)) + "!");
      }
    }
    static inline bool canConvert(jsi::Runtime& runtime, const jsi::Value& value) {
      if (!value.isString()) {
        return false;
      }
      std::string unionValue = JSIConverter<std::string>::fromJSI(runtime, value);
      switch (hashString(unionValue.c_str(), unionValue.size())) {
        case hashString("FIRST_NAME"):
        case hashString("LAST_NAME"):
        case hashString("MIDDLE_NAME"):
        case hashString("PHONE_NUMBERS"):
        case hashString("EMAIL_ADDRESSES"):
        case hashString("IMAGE_DATA"):
        case hashString("THUMBNAIL_IMAGE_DATA"):
        case hashString("GIVEN_NAME_KEY"):
          return true;
        default:
          return false;
      }
    }
  };

} // namespace margelo::nitro
