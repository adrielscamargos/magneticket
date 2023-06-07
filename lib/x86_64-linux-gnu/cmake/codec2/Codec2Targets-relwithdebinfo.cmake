#----------------------------------------------------------------
# Generated CMake target import file for configuration "RelWithDebInfo".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "Codec2::codec2" for configuration "RelWithDebInfo"
set_property(TARGET Codec2::codec2 APPEND PROPERTY IMPORTED_CONFIGURATIONS RELWITHDEBINFO)
set_target_properties(Codec2::codec2 PROPERTIES
  IMPORTED_LOCATION_RELWITHDEBINFO "${_IMPORT_PREFIX}/lib/x86_64-linux-gnu/libcodec2.so.0.9"
  IMPORTED_SONAME_RELWITHDEBINFO "libcodec2.so.0.9"
  )

list(APPEND _IMPORT_CHECK_TARGETS Codec2::codec2 )
list(APPEND _IMPORT_CHECK_FILES_FOR_Codec2::codec2 "${_IMPORT_PREFIX}/lib/x86_64-linux-gnu/libcodec2.so.0.9" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
