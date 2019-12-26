import React, { Component } from "react";
import { Form, Button, Header, Input, Message } from "semantic-ui-react";
import { AuthConsumer } from "../AuthContext";
// import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

// const URL = 'http://localhost:5000/api/web/protected/postOpenBiddingBem2020';
const URL = "https://backend-bem.herokuapp.com/api/web/public/postOpenBiddingBem2020";

export default class FormPendaftaran extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nim: "",
			nama: "",
			prodi: "",
			idLine: "",
			pilihan1: "",
			pilihan2: "",
			loading: false,
			messagenim: false,
		};
	}

	handleChange = (e, { value }) => this.setState({ value });

	postDaftar = async () => {
		const body = {
			nim: this.state.nim,
			nama: this.state.nama,
			prodi: this.state.prodi,
			idLine: this.state.idLine,
			pilihan1: this.state.pilihan1,
			pilihan2: this.state.pilihan2
		};
		await fetch(URL, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				if (response.ok) {
					console.log("sukses");
					return response.json();
				}
				return response.json().then(error => {
					throw new Error(error);
				});
			})
			.then(ress => {
				// console.log(ress)
				this.props.history.replace("/success");
			});
	}

	daftar = async () => {
			var nm = this.state.nim;
			var cek1 = nm.substring(0, 2) == "17";
			var cek2 = nm.substring(0, 2) == "18";
			var cek3 = nm.substring(3, 6) == "150";
		if (this.state.nim.length == 15 && (nm.includes('e')===false) && ( cek1 || cek2) && cek3 ) {
			const URL1 = 'https://backend-bem.herokuapp.com/api/web/public/checkOpenBiddingBem2020';
			const body = {
				nim: this.state.nim
			}
			const res = fetch(URL1, {
				method: "POST",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify(body)
			}).then(ress => {
				console.log(ress);
				return ress.json()
			}).then(resss => {
				console.log(resss);
				if (resss.status === true) {
					this.props.history.replace("/success");
				} else {
					this.postDaftar();
				}
			})
		} else {
			this.setState({ loading: false });
			this.setState({ messagenim: true });
		}
	};

	render() {
		var batas = new Date("2020-01-04T24:00:00+07:00");
		var pembukaan = new Date("2019-10-21T18:00:00+07:00");
		var sekarang = new Date();
		if (batas < sekarang) {
			this.props.history.replace('/registered');
		}
		// if (pembukaan > sekarang) {
		// 	this.props.history.replace('/closed')
		// }
		const jabatan = [
			{ key: 0, value: null, text: 'Pusat Jaminan Mutu Organisasi (PJMO)', disabled: true },
			{ key: 1, value: 'PJMO', text: 'PJMO' },
			{ key: 2, value: null, text: 'Pengembangan Sumber Daya Manusia (PSDM)', disabled: true },
			{ key: 3, value: 'Menteri PSDM', text: 'Menteri PSDM' },
			{ key: 4, value: 'Dirjen Kaderisasi', text: 'Dirjen Kaderisasi' },
			{ key: 5, value: 'Dirjen P2M', text: 'Dirjen P2M' },
			{ key: 6, value: null, text: 'Keilmuan Karir Prestatif (KKP)', disabled: true },
			{ key: 7, value: 'Mentri KKP', text: 'Mentri KKP' },
			{ key: 8, value: 'Wakil Mentri KKP', text: 'Wakil Mentri KKP' },
			{ key: 9, value: null, text: 'Perhubungan', disabled: true },
			{ key: 10, value: 'Menteri Perhubungan', text: 'Menteri Perhubungan' },
			{ key: 11, value: 'Dirjen Dalam Negeri', text: 'Dirjen Dalam Negeri' },
			{ key: 12, value: 'Dirjen Luar Negeri', text: 'Dirjen Luar Negeri' },
			{ key: 13, value: null, text: 'Advokasi dan Kesejahteraan Mahasiswa (Advokesma)', disabled: true },
			{ key: 14, value: 'Menteri Advokesma', text: 'Menteri Advokesma' },
			{ key: 15, value: 'Dirjen Advokasi dan Kebijakan Kampus', text: 'Dirjen Advokasi dan Kebijakan Kampus' },
			{ key: 16, value: 'Dirjen Kesejahteraan Mahasiswa', text: 'Dirjen Kesejahteraan Mahasiswa' },
			{ key: 17, value: null, text: 'Sosial Lingkungan (Sosling)', disabled: true },
			{ key: 18, value: 'Menteri Sosling', text: 'Menteri Sosling' },
			{ key: 19, value: 'Dirjen Lingkungan Hidup', text: 'Dirjen Lingkungan Hidup' },
			{ key: 20, value: 'Dirjen Pengabdian Masyarakat', text: 'Dirjen Pengabdian Masyarakat' },
			{ key: 21, value: null, text: 'Kajian dan Aksi Strategis (Kastrat)', disabled: true },
			{ key: 22, value: 'Menteri Kastrat', text: 'Menteri Kastrat' },
			{ key: 23, value: 'Wakil Menteri Kastrat', text: 'Wakil Menteri Kastrat' },
			{ key: 24, value: null, text: 'Biro Pengembangan Informasi Teknologi (PIT)', disabled: true },
			{ key: 25, value: 'Kabiro PIT', text: 'Kepala Biro PIT' },
			{ key: 26, value: 'Wakabiro PIT', text: 'Wakil Kepala Biro PIT' },
			{ key: 27, value: null, text: 'Biro Bisnis dan Kemitraan (Bismit)', disabled: true },
			{ key: 28, value: 'Kabiro Bismit', text: 'Kepala Biro Bismit' },
			{ key: 29, value: 'Wakabiro Bismit', text: 'Wakil Kepala Biro Bismit' },
			{ key: 30, value: null, text: 'Biro Administrasi Keseketariatan dan Keuangan (Adkeu)', disabled: true },
			{ key: 31, value: 'Kabiro Adkeu', text: 'Kepala Biro Adkeu' },
			{ key: 32, value: 'Wakabiro Adkeu', text: 'Wakil Kepala Biro Adkeu' },
			{ key: 33, value: null, text: 'Biro Media Kreatif dan Informasi', disabled: true },
			{ key: 34, value: 'Kabiro Media Kreatif dan Informasi', text: 'Kepala Biro Media Kreatif dan Informasi' },
			{ key: 35, value: 'Kabag Medkraf', text: 'Kepala Bagian Media Kreatif' },
			{ key: 36, value: 'Kabag Medinfo', text: 'Kepala Bagian Media Informasi' },
		]

		const jabatan2 = [
			{ key: 37, value: 'Tidak Memilih', text: '--Tidak Memilih--' },
			...jabatan,
		]

		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '3vw' }}>
				<Header textAlign="center" as='h1' content='Form Pendaftaran Online' />
				<div style={{ width: '50vw' }}>
					<Form onSubmit={() => {
						this.setState({ loading: true })
						this.daftar()
					}}>
						<Form.Input fluid required label="Nama" placeholder="Nama" onChange={(e) => { this.setState({ nama: e.target.value }) }} />
						<Form.Input fluid type="number" required label="NIM" placeholder="NIM" onChange={(e) => { this.setState({ nim: e.target.value }) }} />
						<Form.Input fluid required label="Program Studi" placeholder="Program Studi" onChange={(e) => { this.setState({ prodi: e.target.value }) }} />
						<Form.Input required fluid label="Line" onChange={(e) => { this.setState({ idLine: e.target.value }) }} placeholder="ID Line" />
						<Form.Dropdown clearable required fluid selection options={jabatan} label="Pilihan Pertama" placeholder="Silahkan pilih" onChange={(e, { value }) => { this.setState({ pilihan1: value }) }} />
						<Form.Dropdown clearable required fluid selection options={jabatan2} label="Pilihan Kedua" placeholder="Silahkan pilih" onChange={(e, { value }) => { this.setState({ pilihan2: value }) }} />
						{this.state.loading === false && (
							<Button
								color="blue"
								fluid
							// onClick={() => {
							// 	this.setState({loading: true});
							// 	// this.daftar(nama, nim, prodi);
							// }}
							>
								Submit
							</Button>
						)}
						{this.state.loading === true && (
							<Button color="blue" loading fluid>
								Login
							</Button>
						)}
					</Form>
					{this.state.messagenim === true && (
						<Message
							style={{ marginBottom: 20, marginTop: 20 }}
							error
							header='Nim tidak tepat!'
							content='Silahkan isi form kembali, dan input nim dengan benar'
						/>
					)}
				</div>
			</div>
		);
	}
}