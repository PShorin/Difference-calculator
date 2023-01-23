[![Actions Status](https://github.com/PShorin/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/PShorin/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/dcdeac6a1d337ee0c25a/maintainability)](https://codeclimate.com/github/PShorin/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dcdeac6a1d337ee0c25a/test_coverage)](https://codeclimate.com/github/PShorin/frontend-project-46/test_coverage)
[![.github/workflows/nodejs.yml](https://github.com/PShorin/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/PShorin/frontend-project-46/actions/workflows/nodejs.yml)

<h2 align="center">Welcome to the Difference Calculator!</h2> 
A difference calculator is a program that determines the difference between two data structures. A similiar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

The project was made using a special library commander.js, which simplifies the creation of command line utilities (cli).

Utility features:
 - Support for different input formats: ```yaml```, ```json```
 - Generation a report in the form of ```plain text```, ```stylish```, ```json```

 ### Usage:
```bash
# plain format
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish format
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}

```

In the stylelish format: 
The absence of a plus or minus indicates that the key is in both files, and its values are the same. In all other situations, the key value is either different, or the key is in only one file. In the example above, the timeout key is in both files, but has different values, proxy is only in file1, and verbose is only in file2.

### System requirements:
Node 14.x version at least
### How to install
```bash
#clone this repository on your machine with SSH key
$git clone git@github.com:PShorin/frontend-project-46.git

#go to directory where you downloaded it
$cd directory-name

# run the one of these command to install all necessary dependencies
$make install
or
$npm ci

# this command is responsible for linking commands from package.json to "./bin" directory
$npm link

#run utility
$ gendiff <filepath1> <filepath2>
```

### Gendiff launch example:
  1. Stylish format with JSON and YAML files:
[![asciicast](https://asciinema.org/a/GUR6dYkDxgRYIO5eH8g2Gm67e.svg)](https://asciinema.org/a/GUR6dYkDxgRYIO5eH8g2Gm67e)

  2. Plain format with JSON and YAML files:
[![asciicast](https://asciinema.org/a/yv6g4qx2zbhzyDsjnwONbPIk1.svg)](https://asciinema.org/a/yv6g4qx2zbhzyDsjnwONbPIk1)

  3. JSON format with JSON and YAML files:
[![asciicast](https://asciinema.org/a/QXUNrFZME6JFpZ2aDgsKn9xjV.svg)](https://asciinema.org/a/QXUNrFZME6JFpZ2aDgsKn9xjV)