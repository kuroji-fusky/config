from file_handler import *

__all__ = [
    "load_file",
    "read_file",
    "save_file",
    "write_file",
    "KuroFileHandler"
]

load_file = KuroFileHandler().read
read_file = KuroFileHandler().read

save_file = KuroFileHandler().write
write_file = KuroFileHandler().write
