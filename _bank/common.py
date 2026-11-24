BANK = []
def Q(d, l, r, q, correct, wrong, e, f=None):
    assert len(wrong) == 3, q
    BANK.append({"d": d, "l": l, "r": r, "q": q, "o": [correct] + list(wrong), "e": e, **({"f": f} if f else {})})
