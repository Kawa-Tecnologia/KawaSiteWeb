// import React, { useState } from 'react'
// import FuturisticModal from './FuturistModal'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// interface RequestDevs {
//   id: number
//   name: string
//   title: string
//   description: string
//   email: string
//   phone: string
//   term: number
//   value: number
//   points_required: number
//   type: string
//   cep: string
//   local: string
//   user_id_requested: number
// }
// const RequestCard: React.FC<{
//   key: number
//   training: RequestDevs
//   userPoints: number
// }> = ({ key, training }) => {
//   const userId = Number(localStorage.getItem('userId'))
//   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
//   const [showModal, setShowModal] = useState<boolean>(false)
//   const [participationsIds, setParticipationsIds] = useState<number[]>([])
//   const [userPoints, setUserPoints] = useState<number>(
//     Number(localStorage.getItem('userPoints')) || 0
//   )
//   const [modalRequestDevs, setModalRequestDevs] = useState<RequestDevs>({
//     id: 0,
//     name: '',
//     title: '',
//     description: '',
//     email: '',
//     phone: '',
//     term: 0,
//     value: 0,
//     points_required: 0,
//     type: '',
//     local: '',
//     cep: '',
//     user_id_requested: 0
//   })
//   const handleDetailsClick = (requestDevs: RequestDevs) => {
//     setShowModal(true)
//     setModalRequestDevs(requestDevs)
//   }
//   const closeModal = () => {
//     setModalIsOpen(false)
//     setShowModal(false)
//   }

//   const handleCheckout = async (requestDevs: RequestDevs) => {
//     if (userPoints < requestDevs.points_required) {
//       return
//     } else if (participationsIds.includes(requestDevs.id)) {
//       return
//     } else {
//       const body = {
//         request_dev_id: requestDevs.id,
//         receive_user_id: userId,
//         status: 'REQUESTED'
//       }

//       const url = `${process.env.REACT_APP_API_URL}/api/request-devs-records`
//       try {
//         const { data } = await axios.post(url, body, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         })

//         if (data.message === 'Recebimento criado com sucesso') {
//           const updatedPoints = userPoints - requestDevs.points_required
//           localStorage.setItem('userPoints', updatedPoints.toString())
//           setUserPoints(updatedPoints)
//           setParticipationsIds([...participationsIds, requestDevs.id])
//           toast.success('Participação Confirmada!', {
//             position: 'top-center'
//           })
//         }
//       } catch (error) {
//         console.error('Erro ao confirmar participação:', error)
//       }
//     }
//   }

//   const renderDetails = (requestDevs: RequestDevs) => (
//     <div className='modal-content'>
//       <div>
//         <strong>Nome:</strong> {requestDevs.name}
//       </div>
//       {userPoints > 0 &&
//         requestDevs.phone &&
//         participationsIds.includes(requestDevs.id) && (
//           <div>
//             <strong>Telefone Celular:</strong> {requestDevs.phone}
//           </div>
//         )}
//       {userPoints > 0 &&
//         requestDevs.email &&
//         participationsIds.includes(requestDevs.id) && (
//           <div>
//             <strong>Email:</strong> {requestDevs.email}
//           </div>
//         )}
//       <div>
//         <strong>Título:</strong> {requestDevs.title}
//       </div>
//       {userPoints === 0 && (
//         <div>
//           <strong>Descrição:</strong> {requestDevs.description.substring(0, 20)}
//           ...
//         </div>
//       )}
//       {userPoints > 0 && (
//         <div>
//           <strong>Descrição:</strong> {requestDevs.description}
//         </div>
//       )}
//       <div>
//         <strong>Período:</strong> {requestDevs.term} dias
//       </div>
//       <div>
//         <strong>Tipo:</strong> {requestDevs.type}
//       </div>
//       <div>
//         <strong>Local:</strong> {requestDevs.local}
//       </div>
//       {requestDevs.local === 'in person' && (
//         <div>
//           <strong>CEP:</strong> {requestDevs.cep}
//         </div>
//       )}

//       <div>Pontos Necessários: {requestDevs.points_required}</div>
//     </div>
//   )

//   const handleAdquirirPontos = () => {
//     setModalIsOpen(true)
//   }

//   return (
//     <div key={key} className='training-card'>
//       <div className='training-details'>
//         {training.user_id_requested === userId && (
//           <div className='gold-medal'>🥇</div>
//         )}
//         <div>
//           <strong>Nome:</strong> {training.name}
//         </div>
//         <div>
//           <strong>Titulo:</strong> {training.title}
//         </div>
//         <div>
//           {userPoints > 0 &&
//             training.email &&
//             participationsIds.includes(training.id) && (
//               <div>
//                 <strong>Email:</strong> {training.email}
//               </div>
//             )}
//           {userPoints > 0 &&
//             training.phone &&
//             participationsIds.includes(training.id) && (
//               <div>
//                 <strong>Telefone Celular:</strong> {training.phone}
//               </div>
//             )}
//         </div>
//         {userPoints === 0 && (
//           <div>
//             <strong>Descrição:</strong> {training.description.substring(0, 20)}
//             ...
//           </div>
//         )}
//         {userPoints > 0 && (
//           <div>
//             <strong>Descrição:</strong> {training.description}
//           </div>
//         )}
//         <div>
//           <strong>Prazo:</strong> {training.term} dias
//         </div>
//         <div>
//           <strong>Local:</strong> {training.local}
//         </div>
//         <div>
//           <strong>Tipo:</strong> {training.type}
//         </div>

//         <div>
//           <strong>Pontos Necessários: </strong>
//           {training.points_required}
//         </div>
//       </div>
//       <div className='button-container'>
//         <button onClick={() => handleDetailsClick(training)}>Detalhes</button>
//       </div>
//       <div className='button-container'>
//         {userPoints < training.points_required ? (
//           <>
//             <button onClick={handleAdquirirPontos}>Adquirir Pontos</button>
//             <FuturisticModal
//               modalIsOpen={modalIsOpen}
//               closeModal={closeModal}
//             />
//           </>
//         ) : participationsIds.includes(training.id) ? (
//           <button
//             onClick={() => {}}
//             disabled={true}
//             className='disabled-button'
//           >
//             Em atendimento
//           </button>
//         ) : (
//           <button onClick={() => handleCheckout(training)}>
//             Entrar em Contato
//           </button>
//         )}
//       </div>

//       <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
//         <div className='modal-content'>
//           <span className='close' onClick={closeModal}>
//             &times;
//           </span>
//           <p id='modal-details'>{renderDetails(modalRequestDevs)}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RequestCard
