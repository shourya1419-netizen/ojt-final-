from wagtail import hooks
from django.templatetags.static import static

@hooks.register("insert_global_admin_css")
def global_admin_css():
    return f'<link rel="stylesheet" href="{ static("theme/theme.css") }">'

@hooks.register("insert_global_admin_js")
def global_admin_js():
    return f'<script src="{ static("theme/theme.js") }"></script>'





 




 