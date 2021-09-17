from os import truncate
import subprocess

class GitCommand:
    def run(*args):
        return subprocess.check_call(["git"] + list(args))


    def git_add():
        GitCommand.run("add", "*")
        print("Adding File")

    
    def git_commit():
        if is_file_update == False:
            GitCommand.run("commit", "-m", f"{commit_name}")
            print("Comitting File")
        
        elif is_file_update == True:
            GitCommand.run("commit", "-m", "File Update")
            print("Comitting File Update")
        
    
    def git_push():
        GitCommand.run("push", "origin", "main")
        subprocess.check_call("RizkyHydra")
        print("Pushing File")
    

is_file_update = True
commit_name = "?"

print()
GitCommand.git_add()
GitCommand.git_commit()
GitCommand.git_push()

