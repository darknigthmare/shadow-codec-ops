"""Small OOXML/ZIP helpers preserved from the audited P46/P47 builder.
Only read/load or explicit raw ZIP reconstruction; never save historical OOXML.
"""
from xml.etree import ElementTree as ET
import copy,io,json,struct,zipfile
NS="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
Q=lambda name:"{"+NS+"}"+name

def scalar(value):
    if value is None: return ''
    if isinstance(value, (dict, list)): return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'))
    return str(value)

def col(n):
    value = ''
    while n:
        n, r = divmod(n - 1, 26); value = chr(65 + r) + value
    return value

def worksheet(table):
    root = ET.Element(Q('worksheet'))
    ET.SubElement(root, Q('dimension'), ref=f'A1:{col(len(table[0]))}{len(table)}')
    view = ET.SubElement(ET.SubElement(root, Q('sheetViews')), Q('sheetView'), workbookViewId='0')
    ET.SubElement(view, Q('pane'), ySplit='1', topLeftCell='A2', activePane='bottomLeft', state='frozen')
    data = ET.SubElement(root, Q('sheetData'))
    for i, values in enumerate(table, 1):
        row = ET.SubElement(data, Q('row'), r=str(i))
        for j, value in enumerate(values, 1):
            c = ET.SubElement(row, Q('c'), r=col(j) + str(i), t='inlineStr')
            t = ET.SubElement(ET.SubElement(c, Q('is')), Q('t'))
            text = scalar(value)
            if text[:1].isspace() or text[-1:].isspace(): t.set('{http://www.w3.org/XML/1998/namespace}space', 'preserve')
            t.text = text
    ET.SubElement(root, Q('autoFilter'), ref=f'A1:{col(len(table[0]))}{len(table)}')
    return ET.tostring(root, encoding='utf-8', xml_declaration=True)

def read_table(z, member):
    root = ET.fromstring(z.read(member))
    return [[''.join(c.itertext()) for c in row] for row in root.find(Q('sheetData'))]

def raw_zip_records(raw):
    with zipfile.ZipFile(io.BytesIO(raw)) as z:
        infos = z.infolist(); start_dir = z.start_dir
        assert len(infos) < 65535 and len({i.filename for i in infos}) == len(infos)
        offsets = sorted(i.header_offset for i in infos)
        ends = dict(zip(offsets, offsets[1:] + [start_dir]))
        locals_ = {i.filename: raw[i.header_offset:ends[i.header_offset]] for i in infos}
        central = {}; at = start_dir
        for info in infos:
            assert raw[at:at + 4] == b'PK\x01\x02'
            n, e, c = struct.unpack_from('<HHH', raw, at + 28)
            record = raw[at:at + 46 + n + e + c]
            assert record[46:46+n].decode('utf-8' if info.flag_bits & 0x800 else 'cp437') == info.filename
            central[info.filename] = record; at += len(record)
        assert raw[at:at + 4] == b'PK\x05\x06' and not raw[at:].startswith(b'PK\x06\x06')
        return infos, locals_, central, z.comment
