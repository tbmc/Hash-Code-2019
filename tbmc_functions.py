from typing import List, Set, Dict, Tuple, Generator, Union
from collections import defaultdict, OrderedDict
# from dataclasses import dataclass


# @dataclass
class Image:
    id: Union[int, Tuple[int]]
    layout: str
    tags: Set[str]
    used: bool = False

    def __init__(self, id, layout, tags, used=False):
        self.id = id
        self.layout = layout
        self.tags = tags
        self.used = used

    def __str__(self):
        if type(self.id) == int:
            return str(self.id)
        return "%d %d" % self.id

    def __lt__(self, other):
        if other is None:
            return
        return len(self.tags) < len(other.tags)


class NotUsedImageGenerator:
    def __init__(self, lst: List[Image]):
        self.lst = lst

    def __len__(self):
        return len(self.lst)

    def __iter__(self):
        for image in self.lst:
            if not image.used:
                yield image


def read_file(file_path: str) -> Tuple[List[Image]]:
    "Read file in list d'Images, (horizontals, verticals)"
    content = open(file_path).read()
    content = content.strip().replace("\r", "").split("\n")[1:]
    horizontals = []
    verticals = []
    for idx, line in enumerate(content):
        layout, osef, *tags = line.split(" ")
        image = Image(idx, layout, set(tags))
        if layout == "H":
            horizontals.append(image)
        else:
            verticals.append(image)
    return horizontals, verticals


def create_map_for_suite(content: List[Image]) -> Dict[str, List[Image]]:
    """
    Inverse indexé pour trouver tous les élements qui ont les mêmes tags
    """
    big_map = defaultdict(list)
    for line in content:
        line.used = False
        for tag in line.tags:
            big_map[tag].append(line)
    return big_map


def regroup_verticals(content: List[Image], need_filter=False) -> List[Image]:
    """
    Prend toutes les images verticales et les regroupe et retourne la liste regroupé
    """
    verticals = content
    if need_filter:
        verticals = filter(lambda i: i.layout == "V", content)
    temp = list(map(lambda i: (len(i.tags), i), verticals))
    temp.sort()
    out_list = []
    size = len(temp)
    for i in range(int(size / 2)):
        _, first = temp[i]
        _, last = temp[size - 1 - i]
        ids = first.id, last.id
        image = Image(id=ids, layout=None, tags=first.tags | last.tags)
        out_list.append(image)
    return out_list


def create_sorted_list_generator(content: List[Image]):
    content.sort(key=lambda i: len(i.tags))
    gen = NotUsedImageGenerator(content)
    return gen


def compute_score(image1: Image, image2: Image):
    s1 = image1.tags
    s2 = image2.tags
    intersection_size = 0
    for tag in s1:
        if tag in s2:
            intersection_size += 1
    # intersection_size = len(s1 & s2)
    s1_exclusive = len(s1) - intersection_size
    s2_exclusive = len(s2) - intersection_size
    return min(intersection_size, s1_exclusive, s2_exclusive)
    # a = len(s1 - s2)
    # b = len(s1 & s2)
    # c = len(s2 - s1)
    # return min(a, b, c)


def generator_images_score(bmap: Dict[str, List[Image]], image: Image):
    for tag in image.tags:
        if tag in bmap:
            for img in bmap[tag]:
                if img.used:
                    continue
                yield (compute_score(image, img), img)
    yield 0, None


def get_next_image(bmap: Dict[str, List[Image]], image: Image) -> Image:
    m = max(generator_images_score(bmap, image), key=lambda o: o[0])
    if m == 0:
        return None
    return m[1]


def create_output_list(bmap, not_used_gen) -> List[Image]:
    iterator = iter(not_used_gen)
    current = next(iterator)
    current.used = True
    out_list = [current]

    for i in range(len(not_used_gen)):
        print("iter", i)
        if i % 1000 == 0:
            print("X" if i % 10_000 == 0 else ".", end="")
        image = get_next_image(bmap, current)
        if image is None:
            try:
                image = next(iterator)
            except StopIteration:
                print()
                return out_list
        image.used = True
        out_list.append(image)
        current = image
    print()
    return out_list


def create_string(lst: List[Image]):
    s = "%d\n" % len(lst)
    data = map(str, lst)
    return s + "\n".join(data)


def compute_file(input_path: str, output_path: str = None, debug: bool = True) -> None:
    print(input_path)
    if output_path is None:
        output_path = input_path + ".out"
    horizontals, verticals = read_file(input_path)
    verticals = regroup_verticals(verticals, False)
    total_list = horizontals + verticals

    not_used_gen = create_sorted_list_generator(total_list)
    bmap = create_map_for_suite(total_list)

    output_list = create_output_list(bmap, not_used_gen)
    s = create_string(output_list)

    with open(output_path, "w") as f:
        f.write(s)
