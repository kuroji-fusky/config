from io import TextIOWrapper, _WrappedBuffer
from typing import Optional, Callable, Any
from functools import partial
import json

__all__ = ["KuroFileHandler"]


class FileRequiredError(BaseException):
    """Throws an exception when a file path isn't provided."""
    pass


_CallableInferExtension = Callable[[str, TextIOWrapper[_WrappedBuffer]], Any]  # noqa


class KuroFileHandler:

    def __init__(self,
                 encoding: Optional[str] = "utf-8",
                 infer_filetype: Optional[bool] = True,
                 inferer_callback: Optional[_CallableInferExtension] = None):
        self._encoding = encoding
        self._infer_filetype = infer_filetype
        self._inferer_callback = inferer_callback

    def __check_overrides(self, encoding: Optional[str],
                          inferer_callback: Optional[_CallableInferExtension]):
        """Checks for any overrides when instaniating from the base class
        """
        override_encoding = self._encoding
        override_inferer_callback = self._inferer_callback

        if encoding:
            override_encoding = encoding

        if inferer_callback:
            override_inferer_callback = inferer_callback

        return override_encoding, override_inferer_callback

    def read(self,
             path: str,
             *,
             encoding: Optional[str],
             infer_filetype: Optional[bool],
             inferer_callback: Optional[_CallableInferExtension]):
        if path is None:
            raise FileRequiredError("A file name should be specified, dummy")

        _load_encoding, _load_inferer_callback = self.__check_overrides(encoding, inferer_callback)  # noqa

        try:
            with open(path, "r", encoding=_load_encoding) as _file_buffer:
                if infer_filetype and path.endswith(".json"):
                    return json.load(_file_buffer)

                if infer_filetype and _load_inferer_callback:
                    partial(inferer_callback, path=path,
                            file_buffer=_file_buffer)

                return _file_buffer

        except FileNotFoundError as e:
            raise e

    def write(self,
              path: str,
              *,
              truncate: Optional[bool],
              encoding: Optional[str],
              inferer_callback: Optional[_CallableInferExtension]) -> None:
        _save_encoding, _save_inferer_callback = self.__check_overrides(encoding, inferer_callback)  # noqa
        _mode = "w"

        if path is None:
            raise FileRequiredError("Cannot save file if path isn't specified lol")  # noqa

        if truncate:
            _mode = "a+"

        try:
            with open(path, _mode, encoding=_save_encoding) as _file_buffer:
                if path.endswith(".json"):
                    json.dump(_file_buffer, path)

                if _save_inferer_callback:
                    partial(_save_inferer_callback, path=path, file_buffer=_file_buffer)  # noqa

                _file_buffer.write(path)

        except Exception as e:
            raise e

    # Aliases
    load = read
    save = write
