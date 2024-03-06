// const [showModal, setShowModal] = useState<boolean>(false)
// const [modalTitle, setModalTitle] = useState<string>('')
// const [modalDetails, setModalDetails] = useState<Plan>({
//   name: '',
//   description: '',
//   amount: 0,
//   points: '',
//   previous_amount: 0,
//   type: '',
//   qr_code: '',
//   period: '',
//   active: true,
//   text: '',
// })

// const openModal = (title: string, plan: Plan) => {
//     setShowModal(true)
//     setModalTitle(title)
//     setModalDetails(plan)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setShowPaymentModal(false)
//   }

//   const handleButtonClick = (title: string, details: Plan) => {
//     openModal(title, details)
//   }

//   const renderDetails = (plan: Plan) => {
//     return { __html: `     <p><strong>Descrição:</strong> ${plan.description.replace(/\n/g, '<br>')}</p>
//     <p><strong>Pontos:</strong> ${plan.points}</p>
//     <p><strong>Preço:</strong> ${plan.amount}</p>
//     <p><strong>Período:</strong> ${plan.period}</p>
//     <!-- Adicione mais campos conforme necessário -->`}
//   }

//   <div id="myModal" className={`modal ${showModal ? 'show' : ''}`}>
//         <div className="modal-content">
//           <span className="close" onClick={closeModal}>
//             &times;
//           </span>
//           <h2 id="modal-title">{modalTitle}</h2>
//           <p
//             id="modal-details"
//             dangerouslySetInnerHTML={renderDetails(modalDetails)}
//           ></p>
//           <button id="modal-buy-button">Adquirir Plano</button>
//         </div>
//       </div>