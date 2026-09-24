import urllib.request
import json
import sys
import datetime
import os
sys.stdout.reconfigure(encoding='utf-8')

PAT = "2/1218447475560483/1218483381697302:02f559e3047b763ce4982b5eae2c0755"
MAIN_TASK_GID = "1218487564380815"

def asana_get(url):
    req = urllib.request.Request(url)
    req.add_header('Authorization', f'Bearer {PAT}')
    req.add_header('Accept', 'application/json')
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())['data']
    except Exception as e:
        print(f"Lỗi API GET: {e}")
        return []

def asana_put(url, data):
    req = urllib.request.Request(url, data=json.dumps({"data": data}).encode('utf-8'), method='PUT')
    req.add_header('Authorization', f'Bearer {PAT}')
    req.add_header('Content-Type', 'application/json')
    req.add_header('Accept', 'application/json')
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())['data']
    except Exception as e:
        print(f"Lỗi API PUT: {e}")
        if hasattr(e, 'read'):
            print(e.read().decode())
        return None

def find_subtask_by_date(target_date_str):
    # Lấy danh sách tháng
    months = asana_get(f"https://app.asana.com/api/1.0/tasks/{MAIN_TASK_GID}/subtasks?opt_fields=name,due_on")
    target_month = int(target_date_str.split('-')[1])
    target_year = target_date_str.split('-')[0]
    
    month_task = None
    for m in months:
        if f"Tháng {target_month}/{target_year}" in m['name']:
            month_task = m
            break
            
    if not month_task: return None
    
    # Lấy danh sách tuần
    weeks = asana_get(f"https://app.asana.com/api/1.0/tasks/{month_task['gid']}/subtasks?opt_fields=name,due_on")
    for w in weeks:
        days = asana_get(f"https://app.asana.com/api/1.0/tasks/{w['gid']}/subtasks?opt_fields=name,due_on")
        for d in days:
            if d.get('due_on') == target_date_str:
                return d['gid']
    
    return None

def update_daily_report(date_str, report_filepath):
    print(f"Đang tìm task cho ngày {date_str}...")
    task_gid = find_subtask_by_date(date_str)
    if not task_gid:
        print(f"Không tìm thấy task cho ngày {date_str} trên Asana!")
        return
        
    print(f"Đã tìm thấy task ID: {task_gid}. Đang đọc file báo cáo...")
    if not os.path.exists(report_filepath):
        print(f"File {report_filepath} không tồn tại!")
        return
        
    with open(report_filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    print("Đang cập nhật Asana...")
    res = asana_put(f"https://app.asana.com/api/1.0/tasks/{task_gid}", {
        "notes": content
    })
    
    if res:
        print("Cập nhật thành công!")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        update_daily_report(sys.argv[1], sys.argv[2])
    else:
        print("Sử dụng: python update_asana_daily.py YYYY-MM-DD /path/to/report.md")
