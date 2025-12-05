from wagtail import hooks
from django.utils.html import format_html
from django.conf import settings
import time

# Cache buster to force reload
VERSION = str(int(time.time()))

@hooks.register("insert_global_admin_css")
def global_admin_css():
    css_url = f'{settings.STATIC_URL}theme/theme.css?v={VERSION}'
    print(f"[DEBUG] Loading CSS from: {css_url}")
    return format_html('<link rel="stylesheet" href="{}">', css_url)

@hooks.register("insert_global_admin_js")
def global_admin_js():
    js_url = f'{settings.STATIC_URL}theme/theme.js?v={VERSION}'
    print(f"[DEBUG] Loading JS from: {js_url}")
    return format_html('<script src="{}"></script>', js_url)
