# -*- coding: utf-8 -*-
s = open('rebuild_paid.py', encoding='utf-8').read()
checks = ['san sang vi the', 'vang 2 nam', 'bac 3 thang', 'dua chung']
for c in checks:
    print(c, 'OK' if c in s.lower() else 'MISSING')
print('Script len:', len(s))
