import urllib.request
import json
import datetime
import calendar
import time
import sys
sys.stdout.reconfigure(encoding='utf-8')

PAT = "2/1218447475560483/1218483381697302:02f559e3047b763ce4982b5eae2c0755"
PROJECT_ID = "1217531540705020"
YEAR = 2026

def asana_post(url, data):
    req = urllib.request.Request(url, data=json.dumps({"data": data}).encode('utf-8'))
    req.add_header('Authorization', f'Bearer {PAT}')
    req.add_header('Content-Type', 'application/json')
    req.add_header('Accept', 'application/json')
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())['data']
    except Exception as e:
        print(f"Error calling Asana API: {e}")
        time.sleep(1) # Đợi 1 chút nếu bị rate limit
        return None

def create_structure():
    print("Dang tao Task chinh: Content Marketing 2026...")
    main_task = asana_post("https://app.asana.com/api/1.0/tasks", {
        "projects": [PROJECT_ID],
        "name": "Content Marketing 2026"
    })
    
    if not main_task: return
    
    days_vi = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"]
    
    for month in range(9, 13):
        print(f"Dang tao Subtask: Thang {month}/{YEAR}...")
        month_task = asana_post(f"https://app.asana.com/api/1.0/tasks/{main_task['gid']}/subtasks", {
            "name": f"Tháng {month}/{YEAR}"
        })
        
        cal = calendar.monthcalendar(YEAR, month)
        week_num = 1
        
        for week in cal:
            actual_days = [d for d in week if d != 0]
            if not actual_days: continue
            
            start_d = actual_days[0]
            end_d = actual_days[-1]
            
            week_name = f"Tuần {week_num} ({start_d:02d}/{month:02d} - {end_d:02d}/{month:02d})"
            print(f"  Dang tao {week_name}...")
            week_task = asana_post(f"https://app.asana.com/api/1.0/tasks/{month_task['gid']}/subtasks", {
                "name": week_name
            })
            
            for i, d in enumerate(week):
                if d != 0:
                    date_str = f"{YEAR}-{month:02d}-{d:02d}"
                    day_name = f"{days_vi[i]} ({d:02d}/{month:02d})"
                    asana_post(f"https://app.asana.com/api/1.0/tasks/{week_task['gid']}/subtasks", {
                        "name": day_name,
                        "due_on": date_str
                    })
                    time.sleep(0.3) # Tránh bị rate limit của Asana
                    
            week_num += 1

    print("Hoan tat!")

if __name__ == "__main__":
    create_structure()
