import urllib.request
import json
import datetime
import os

PAT = "2/1218447475560483/1218483381697302:02f559e3047b763ce4982b5eae2c0755"
PROJECT_ID = "1217531540705020"
MY_GID = "1218447475560483"

def get_tasks():
    url = f"https://app.asana.com/api/1.0/projects/{PROJECT_ID}/tasks?opt_fields=name,completed,due_on,assignee.name,completed_at,created_at"
    req = urllib.request.Request(url)
    req.add_header('Authorization', f'Bearer {PAT}')
    req.add_header('Accept', 'application/json')
    
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())['data']
    except Exception as e:
        print(f"Error calling Asana API: {e}")
        return []

def generate_report():
    tasks = get_tasks()
    today = datetime.date.today()
    
    done_today = []
    doing_today = []
    planned = []
    
    for task in tasks:
        # Lọc các task được gán cho chính bạn
        if not task.get('assignee') or task['assignee']['gid'] != MY_GID:
            continue
            
        if task['completed']:
            # Kiểm tra xem có hoàn thành trong hôm nay không
            if task.get('completed_at') and task['completed_at'].startswith(str(today)):
                done_today.append(task)
        else:
            if not task.get('due_on'):
                doing_today.append(task)
            else:
                due_date = datetime.datetime.strptime(task['due_on'], "%Y-%m-%d").date()
                if due_date <= today:
                    doing_today.append(task)
                else:
                    planned.append(task)
                    
    # Tạo nội dung báo cáo
    report_lines = [
        f"## Báo cáo Asana ngày {today.strftime('%d/%m/%Y')}",
        "",
        "### ✅ Đã hoàn thành hôm nay:",
    ]
    if not done_today: report_lines.append("- (Không có)")
    for t in done_today: report_lines.append(f"- {t['name']}")
    
    report_lines.extend([
        "",
        "### ⏳ Đang làm / Cần làm hôm nay:"
    ])
    if not doing_today: report_lines.append("- (Không có)")
    for t in doing_today: report_lines.append(f"- {t['name']}")
    
    report_lines.extend([
        "",
        "### 📅 Kế hoạch sắp tới:"
    ])
    if not planned: report_lines.append("- (Không có)")
    for t in planned: report_lines.append(f"- {t['name']} (Hạn: {t['due_on']})")
    
    # Lưu ra file markdown
    report = "\n".join(report_lines)
    filepath = os.path.join(os.path.dirname(__file__), "asana_daily_report.md")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(report)
    print("Done")

if __name__ == "__main__":
    generate_report()
