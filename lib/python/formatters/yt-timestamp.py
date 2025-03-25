# For the JS implementation, see js/formatters/ytTimestamp.py
import re

__all__ = [
    "yt_timestamp"
]


def yt_timestamp(ts: str) -> str:
    """Parses timestamp retrieved from the YouTube API

    Args:
        ts (str): A compatible timestamp

    Returns:
        str: A parsed timecode
    """
    match = re.match(r"/PT(\d+H)?(\d+M)?(\d+S)?/", ts)

    if not match:
        return "0:00"

    _, h, m, s = match.groups()

    radix_int = lambda n: int(n[:-1]) if n else 0
    pad_str = lambda n: f"{n:02}"
    _concat_time_str = lambda *val: ":".join(map(str, val))

    hours = radix_int(h)
    minutes = radix_int(m)
    seconds = radix_int(s)

    pad_minute = pad_str(minutes)
    pad_second = pad_str(seconds)

    hour_string = _concat_time_str(hours, pad_minute, pad_second)
    min_sec_string = _concat_time_str(pad_minute, pad_second)

    return hour_string if hours else min_sec_string
