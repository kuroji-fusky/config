import unittest
from kuro_fs import *

import yaml


def yaml_loader(path, file_buffer):
    return yaml.safe_load(file_buffer)


class KuroFSTest(unittest.TestCase):
    def load_json_standalone():
        json_file = read_file()

        assert json_file

    def load_json_via_class():
        handler = KuroFileHandler()

        assert handler.read("test.json")

    # Custom YAML loader
    def custom_yaml_loader_standalone():
        yaml_file = read_file("test.yml", inferer_callback=yaml_loader)

        assert yaml_file

    def custom_yaml_loader_via_class():
        yml_handler = KuroFileHandler(inferer_callback=yaml_loader)
        yaml_file = yml_handler.read("test.yml")

        assert yaml_file
