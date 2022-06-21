import binascii
import os
from uuid import uuid4

from django.conf import settings
from django.db import models
from django.db.models import UniqueConstraint
from django.utils.translation import gettext_lazy as _


class Token(models.Model):
    id = models.UUIDField(default=uuid4, editable=False)
    key = models.CharField(_("Key"), max_length=40, primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='auth_token',
        on_delete=models.CASCADE, verbose_name=_("User")
    )
    key_name = models.CharField(_("Key Name"), max_length=120, default="default")
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)

    class Meta:
        abstract = 'authentication' not in settings.INSTALLED_APPS
        verbose_name = _("Token")
        verbose_name_plural = _("Tokens")
        constraints = [
            models.UniqueConstraint(fields=['user', 'key_name'], name='unique_user_key_name')
        ]


    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super().save(*args, **kwargs)

    @classmethod
    def generate_key(cls):
        return binascii.hexlify(os.urandom(20)).decode()

    def __str__(self):
        return self.key


class TokenProxy(Token):
    """
    Proxy mapping pk to user pk for use in admin.
    """
    @property
    def pk(self):
        return self.user_id

    class Meta:
        proxy = 'authentication' in settings.INSTALLED_APPS
        abstract = 'authentication' not in settings.INSTALLED_APPS
        verbose_name = "token"
