import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-R", "app/server/views", "dist/" );
shell.cp( "-R", "app/client/images", "dist/client/" );
