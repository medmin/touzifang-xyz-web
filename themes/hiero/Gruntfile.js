module.exports = function (grunt) {
  grunt.initConfig({
    gitclone: {
      fontawesome: {
        options: {
          repository: "https://github.com/FortAwesome/Font-Awesome.git",
          directory: "tmp/fontawesome",
        },
      },
      fancybox: {
        options: {
          repository: "https://github.com/fancyapps/fancyBox.git",
          directory: "tmp/fancybox",
        },
      },
    },
    copy: {
      fontawesome: {
        expand: true,
        cwd: "tmp/fontawesome/fonts/",
        src: ["**"],
        dest: "source/css/fonts/",
      },
      fancybox: {
        expand: true,
        cwd: "tmp/fancybox/source/",
        src: ["**"],
        dest: "source/fancybox/",
      },
    },
    uglify: {
      dynamic_mappings: {
        // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
        // runs and build the appropriate src-dest file mappings then, so you
        // don't need to update the Gruntfile when files are added or removed.
        files: [
          {
            expand: true, // Enable dynamic expansion.
            cwd: "source/js/", // Src matches are relative to this path.
            src: ["**/*.js"], // Actual pattern(s) to match.
            dest: "source/js/", // Destination path prefix.
            ext: ".min.js", // Dest filepaths will have this extension.
            extDot: "first", // Extensions in filenames begin after the first dot
          },
        ],
      },
    },
    _clean: {
      tmp: ["tmp"],
      fontawesome: ["source/css/fonts"],
      fancybox: ["source/fancybox"],
      js: ["source/js/*.min.js"],
    },
  });

  require("load-grunt-tasks")(grunt);

  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.renameTask("clean", "_clean");

  grunt.registerTask("fontawesome", [
    "gitclone:fontawesome",
    "copy:fontawesome",
    "_clean:tmp",
  ]);
  grunt.registerTask("fancybox", [
    "gitclone:fancybox",
    "copy:fancybox",
    "_clean:tmp",
  ]);
  grunt.registerTask("default", ["gitclone", "copy", "_clean:tmp"]);
  grunt.registerTask("clean", ["_clean"]);
};
