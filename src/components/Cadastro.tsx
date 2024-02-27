import React from 'react';
import "../assets/styles/CadastroForm.css";

const CadastroForm: React.FC = () => {
    // Lógica do formulário de cadastro aqui...

    return (
        <div>
                    <div className="cadastro-container">

            <h1>Formulário de Cadastro</h1>
            {/* Seu formulário de cadastro aqui */}
            <form>
                {/* Campo Nome Completo */}
                <div>
                    <label htmlFor="fullName">Nome Completo:</label>
                    <input type="text" id="fullName" name="fullName" required />
                </div>

                {/* Campo Email */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>

                {/* Campo Telefone (WhatsApp) */}
                <div>
                    <label htmlFor="phone">Telefone (WhatsApp):</label>
                    <input type="tel" id="phone" name="phone" required />
                </div>

                {/* Campo CPF */}
                <div>
                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" required />
                </div>

                {/* Campos de Endereço */}
                <div>
                    <label htmlFor="street">Rua:</label>
                    <input type="text" id="street" name="street" required />

                    <label htmlFor="number">Número:</label>
                    <input type="text" id="number" name="number" required />

                    <label htmlFor="complement">Complemento:</label>
                    <input type="text" id="complement" name="complement" />

                    <label htmlFor="neighborhood">Bairro:</label>
                    <input type="text" id="neighborhood" name="neighborhood" required />

                    <label htmlFor="city">Cidade:</label>
                    <input type="text" id="city" name="city" required />

                    <label htmlFor="state">Estado:</label>
                    <input type="text" id="state" name="state" required />

                    <label htmlFor="country">País:</label>
                    <input type="text" id="country" name="country" required />

                    <label htmlFor="zip">CEP:</label>
                    <input type="text" id="zip" name="zip" required />
                </div>

                {/* Campos adicionais para Conta Bancária */}
                <div>
                    <label htmlFor="bankName">Nome do Banco:</label>
                    <input type="text" id="bankName" name="bankName" required />

                    <label htmlFor="agency">Agência:</label>
                    <input type="text" id="agency" name="agency" required />

                    <label htmlFor="accountNumber">Conta:</label>
                    <input type="text" id="accountNumber" name="accountNumber" required />

                    <label htmlFor="accountType">Tipo de Conta:</label>
                    <select id="accountType" name="accountType" required>
                        <option value="">Selecione</option>
                        <option value="corrente">Corrente</option>
                        <option value="poupanca">Poupança</option>
                    </select>
                </div>

                {/* Botão de Envio */}
                <button type="submit">Enviar</button>
            </form>
        </div></div>
    );
};

export default CadastroForm;