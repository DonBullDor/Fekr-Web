export class ModuleEtudiantModel {
  constructor(
    public IdEt?: string,
    public CodeModule?: string,
    public NumPanier?: string,
    public CodeCl?: string,
    public AnneeDeb?: string,
    public AnneeFin?: string,
    public NumSession?: number,
    public MoyennePrincipale?: number,
    public MoyenneRat?: number,
    public Situation?: string,
    public NbAbscence?: number
  ) {
  }
}
