import json,collections,sys
import common
import b1_payroll_ops,b2_life_talent_er,b3_ana_str_law,b4_advanced
B=common.BANK
for i,q in enumerate(B): q['id']=f"{q['d']}{i:03d}"
longest=sum(1 for q in B if len(q['o'][0])==max(len(o) for o in q['o']))
shortest=sum(1 for q in B if len(q['o'][0])==min(len(o) for o in q['o']))
print('total',len(B),'correct longest',longest,f'{longest/len(B):.0%}','shortest',shortest)
c=collections.Counter((q['d'],q['l']) for q in B)
for d in sorted({q['d'] for q in B}): print(d,[c[(d,l)] for l in range(1,6)])
if '--long' in sys.argv:
    for q in B:
        L=[len(o) for o in q['o']]
        if L[0]==max(L) and L[0]>1.25*sorted(L)[-2]: print(q['id'],L,q['q'][:70])
json.dump(B,open('/home/claude/munawarka07.github.io/assets/data/skill-bank.json','w'),ensure_ascii=False,separators=(',',':'))
