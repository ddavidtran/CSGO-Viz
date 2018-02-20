import csv
import time

reader = csv.reader(open("mm_grenades_demos.csv", "rb"), delimiter=',')

f = csv.writer(open("mm_grenades.csv", "wb"))
start_time = time.time()
for line in reader:
    #print line
    if any(s in line for s in ("cs_cruise", "de_cache", "de_cbble","de_coast","de_empire", "de_mikla", "de_mirage", "de_overpass", "de_royal", "de_santorini", "de_season","de_tulip", "de_dust", "de_vertigo", "cs_office", "cs_italy", "cs_agency", "de_aztec", "de_canals", "de_thrill", "de_inferno", "de_austria", "cs_insertion", "cs_assault")):
        pass
    else:
        f.writerow(line)

print("--- %s seconds ---" % (time.time() - start_time))