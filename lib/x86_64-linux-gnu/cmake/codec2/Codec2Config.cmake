get_filename_component(CODEC2_CMAKE_DIR "${CMAKE_CURRENT_LIST_FILE}" PATH)

if(NOT TARGET Codec2::codec2)
  include("${CODEC2_CMAKE_DIR}/Codec2Targets.cmake")
endif()

# Backwards compatability
set(Codec2_LIBRARIES Codec2::codec2)
