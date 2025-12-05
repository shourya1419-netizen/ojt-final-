from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel
from wagtail import blocks  # Add this import
from wagtail.images.blocks import ImageChooserBlock

class CardBlock(blocks.StructBlock):
    image = ImageChooserBlock(required=True)
    title = blocks.CharBlock(required=True, max_length=50)
    text = blocks.RichTextBlock(required=False)
    button_page = blocks.PageChooserBlock(required=False)
    button_url = blocks.URLBlock(required=False, help_text="If the page above is selected, that will be used first.")

    class Meta:
        template = "core/blocks/card_block.html"
        icon = "placeholder"
        label = "Card"

class HomePage(Page):
    body = StreamField([
        ('card', CardBlock()),
        ('heading', blocks.CharBlock(form_classname="title")),
        ('paragraph', blocks.RichTextBlock()),
    ], use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]