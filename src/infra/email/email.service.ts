import nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create transporter using SMTP configuration from environment variables
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Send an email
   * @param options Email options including to, subject, text, and optional html
   * @returns Promise with email info
   */
  async sendEmail(options: SendEmailOptions): Promise<any> {
    try {
      const info = await this.transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME || 'AgendaFácil'}" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html || options.text,
      });

      console.log('Email sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  /**
   * Send verification email
   * @param to Recipient email address
   * @param url Verification URL
   * @param token Verification token
   */
  async sendVerificationEmail(to: string, url: string, token: string): Promise<any> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #4CAF50; 
              color: white; 
              text-decoration: none; 
              border-radius: 4px; 
              margin: 20px 0;
            }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Verifique seu Endereço de Email</h2>
            <p>Obrigado por se registrar! Por favor, verifique seu endereço de email clicando no botão abaixo:</p>
            <a href="${url}" class="button">Verificar Email</a>
            <p>Ou copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; color: #4CAF50;">${url}</p>
            <p>Este link expirará em 1 hora.</p>
            <div class="footer">
              <p>Se você não solicitou esta verificação, por favor ignore este email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to,
      subject: 'Verifique seu endereço de email',
      text: `Clique no link para verificar seu email: ${url}`,
      html,
    });
  }

  /**
   * Send password reset email
   * @param to Recipient email address
   * @param url Reset password URL
   * @param token Reset token
   */
  async sendResetPasswordEmail(to: string, url: string, token: string): Promise<any> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #2196F3; 
              color: white; 
              text-decoration: none; 
              border-radius: 4px; 
              margin: 20px 0;
            }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Redefina sua Senha</h2>
            <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha:</p>
            <a href="${url}" class="button">Redefinir Senha</a>
            <p>Ou copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; color: #2196F3;">${url}</p>
            <p>Este link expirará em 1 hora.</p>
            <div class="footer">
              <p>Se você não solicitou a redefinição de senha, por favor ignore este email ou entre em contato com o suporte se tiver dúvidas.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to,
      subject: 'Redefina sua senha',
      text: `Clique no link para redefinir sua senha: ${url}`,
      html,
    });
  }

  /**
   * Send welcome email with temporary password to owner
   * @param to Recipient email address
   * @param verificationUrl Verification URL
   * @param temporaryPassword Temporary password generated
   */
  async sendOwnerWelcomeEmail(to: string, verificationUrl: string, temporaryPassword: string): Promise<any> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #4CAF50; 
              color: white; 
              text-decoration: none; 
              border-radius: 4px; 
              margin: 20px 0;
            }
            .credentials-box {
              background-color: #f5f5f5;
              border-left: 4px solid #4CAF50;
              padding: 15px;
              margin: 20px 0;
            }
            .password {
              font-family: 'Courier New', monospace;
              font-size: 18px;
              font-weight: bold;
              color: #2196F3;
              background-color: #e3f2fd;
              padding: 10px;
              border-radius: 4px;
              display: inline-block;
              margin: 10px 0;
            }
            .warning {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
            }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>🎉 Bem-vindo ao AgendaFácil!</h2>
            <p>Sua conta foi criada com sucesso! Agora você é o proprietário de um novo tenant em nossa plataforma.</p>
            
            <div class="credentials-box">
              <h3>📧 Suas Credenciais de Acesso:</h3>
              <p><strong>Email:</strong> ${to}</p>
              <p><strong>Senha Temporária:</strong></p>
              <div class="password">${temporaryPassword}</div>
            </div>

            <div class="warning">
              <strong>⚠️ IMPORTANTE:</strong>
              <ul>
                <li>Esta é uma senha temporária gerada automaticamente</li>
                <li>Por segurança, recomendamos que você altere sua senha após o primeiro login</li>
                <li>Guarde esta senha em um local seguro</li>
              </ul>
            </div>

            <h3>📝 Próximos Passos:</h3>
            <ol>
              <li><strong>Verifique seu email:</strong> Clique no botão abaixo para verificar seu endereço de email</li>
              <li><strong>Faça login:</strong> Use o email e a senha temporária fornecidos acima</li>
              <li><strong>Altere sua senha:</strong> Configure uma nova senha segura</li>
              <li><strong>Configure seu tenant:</strong> Comece a personalizar sua conta</li>
            </ol>

            <a href="${verificationUrl}" class="button">Verificar Email</a>

            <p>Ou copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; color: #4CAF50;">${verificationUrl}</p>
            <p><small>Este link de verificação expirará em 1 hora.</small></p>

            <div class="footer">
              <p>Se você não solicitou esta conta, por favor ignore este email ou entre em contato com nosso suporte.</p>
              <p>© ${new Date().getFullYear()} AgendaFácil - Todos os direitos reservados</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
Bem-vindo ao AgendaFácil!

Suas credenciais de acesso:
Email: ${to}
Senha Temporária: ${temporaryPassword}

IMPORTANTE: Esta é uma senha temporária. Por favor, altere-a após o primeiro login.

Próximos passos:
1. Verifique seu email clicando no link: ${verificationUrl}
2. Faça login com suas credenciais
3. Altere sua senha
4. Configure seu tenant

Este link de verificação expirará em 1 hora.
    `;

    return this.sendEmail({
      to,
      subject: '🎉 Bem-vindo ao AgendaFácil - Suas Credenciais de Acesso',
      text: text.trim(),
      html,
    });
  }
}