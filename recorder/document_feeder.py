from io import TextIOWrapper

class DocumentFeeder:
    def __init__(self, filepath):
        with open(filepath, 'r') as f:
            f.seek(0,2)
            self.eof = f.tell()
    
    def feed(self):
        line, seek = self.get_line(0)
        while (seek < self.eof):
            line, seek = self.get_line(seek)
            yield line
        return False

    def get_line(self, start_location: int):
        """
        Open a file with seek, read a line into a variable, return the seek location and the line.
        """
        with open('../data/section.txt', 'r') as f:
            f.seek(start_location)
            line, next_seek = self.line_filter(f)
        return line, next_seek

    def line_filter(self, f: TextIOWrapper):
        """
        Filter out lines...
            - with only one string
            - [future rules here]
        """
        line = f.readline()
        if len(line.split()) > 1:
            return line, f.tell() + 1
        else:
            return self.get_line(f.tell())