import common,importlib,sys
for m in sys.argv[1:]: importlib.import_module(m)
B=common.BANK
bad=[]
for q in B:
    l=[len(o) for o in q['o']]; second=sorted(l)[-2]
    if l[0]==max(l) and l[0]-second>6: bad.append((l[0]-second,l,q['q'][:70]))
lg=sum(1 for q in B if [len(o) for o in q['o']][0]==max(len(o) for o in q['o']))
print(len(B),'correct longest',lg,'clearly longest(>6 chars)',len(bad))
for b in sorted(bad,reverse=True): print(b)
