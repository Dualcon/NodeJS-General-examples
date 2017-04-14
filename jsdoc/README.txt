Documentation: http://usejsdoc.org/

Generating A Website: 
Once your code is commented, you can use the JSDoc 3 Tool to generate an HTML website from the source.
By default, JSDoc will use the "default" template to turn the documentation data into HTML. You can edit this template to suit your own needs, or create an entirely new template if that is what you prefer.
Running the documentation generator on the command line.
jsdoc app.js
This command will create a folder named "out" in the current working directory. Within that you will find the generated HTML pages.
To change the folder name use the -d option and -r to be recursive:
jsdoc -d docs -r *
