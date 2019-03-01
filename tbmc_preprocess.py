from collections import defaultdict

def read_file(file_path: str):
    content = open(file_path).read()
    content = content.strip().replace("\r", "").split("\n")[1:]
    total_list = []
    for idx, line in enumerate(content):
        layout, osef, *tags = line.split(" ")
        total_list.append({
            "layout": layout,
            "tags": tags,
            "id": idx
        })
    return total_list

def create_map_for_suite(content):
    big_map = defaultdict(list)
    for line in content:
        line["used"] = False
        for tag in line["tags"]:
            big_map[tag].append(line)
    return big_map
    
def regroup_verticals(content):
    pass
    

content = read_file("./in/a_example.txt")
bmap = create_map_for_suite(content)


print()
